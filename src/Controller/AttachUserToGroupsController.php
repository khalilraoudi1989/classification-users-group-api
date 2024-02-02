<?php

namespace App\Controller;

use App\Repository\GroupRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\DBAL\Driver\Result;
class AttachUserToGroupsController extends AbstractController
{

    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/users/{id}/groups', name: 'api_user_details', methods: ['GET'])]
    public function getGroups(User $user): JsonResponse
    {
        $result = $user->getGroups();

        return $this->json($result, 200, []);
    }
    #[Route('/api/users/{id}/attach-to-groups', name: 'api_users_attach_to_groups', methods: ['POST'])]
    public function attachToGroups(User $user, Request $request, GroupRepository $groupRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        // Get the group ids from the request
        $data = json_decode($request->getContent(), true);
        $groupIds = $data['groupIds'] ?? [];

        // Get the User and Group entities
        $user = $entityManager->getRepository(User::class)->find($user->getId());
        $groups = $groupRepository->findBy(['id' => $groupIds]);
        dump('Before database operations');

        // Attach the user to groups
        foreach ($groups as $group) {
            $user->addToGroup($group);
        }

        // Persist changes to the database
        $entityManager->flush();
        dump('After database operations');

        return $this->json(['message' => 'User attached to groups successfully']);
    }
}
