<?php

namespace App\Security;

use KnpU\OAuth2ClientBundle\Security\Authenticator\OAuth2Authenticator;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\Util\TargetPathTrait;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use App\Entity\User;
use App\Repository\UserRepository;

abstract class AbstractOAuthAuthenticator extends OAuth2Authenticator {

    use targetPathTrait;
    protected string $serviceName = '';

    public function __construct(
        private readonly ClientRegistry $clientRegistry,
        private readonly RouterInterface $router,
        private readOnly UserRepository $user
    ) {
    }

    public function supports(Request $request): ?bool
    {
        return 'auth_oauth_check' === $request->attributes->get('_route') && 
        $request->get('service' === $this->serviceName);
        // TODO: Implement supports() method.
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        $targetPath = $this->getTargetPath($request->getSession(), $firewallName);

        if($targetPath) {
            return new RedirectResponse($targetPath);
        }

        return new RedirectResponse($this->router->generate('index'));
        // TODO: Implement supports() method.
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {

        if($request-hasSession()) {
            $request-getSession()->set(SecurityRequestAttributes::AUTHENTICATION_ERROR, $exception);
        }

        return new RedirectResponse($this->router->generate('auth_oauth_login'));
        // TODO: Implement supports() method.
    }

    public function authenticate(Request $request): SelfValidatingPassport
    {
        // Extract the OAuth credentials from the request
        $credentials = $this->fetchAccessToken($this->getClient());
        $resouceOwner = $this->getResourceOwnerFromCredentials($credentials);
        $user = $this->getUserFromResourceOwner($resouceOwner, $this->repository);

        return new SelfValidatingPassport(
            userBadge: new UserBadge($user->getEmail(), function() use ($user) {
                return $user;
            }),
            badges: [
                new RememberMeBadge() 
            ]
        );

    }

    protected function getResourceOwnerFromCredentials(AccessToken $credentials): ResourceOwnerInterface {  
        return $this->getClient()->fetchUserFromToken($credentials);

    }

    public function getClient(): oAuth2ClientInterface {
        return $this->clientRegistry->getClient($this->serviceName);
    }

}