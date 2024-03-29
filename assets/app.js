import { registerReactControllerComponents } from '@symfony/ux-react';
//import './api/Classification.jsx';
// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

registerReactControllerComponents(require.context('./react/controllers', true, /\.(j|t)sx?$/));