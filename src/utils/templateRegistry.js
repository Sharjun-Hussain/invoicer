import Template1 from '../components/templates/Template1';
import Template2 from '../components/templates/Template2';
import Template3 from '../components/templates/Template3';
import Template4 from '../components/templates/Template4';
import Template5 from '../components/templates/Template5';
import Template6 from '../components/templates/Template6';
import Template7 from '../components/templates/Template7';
import Template8 from '../components/templates/Template8';
import Template9 from '../components/templates/Template9';
import Template10 from '../components/templates/Template10';
import Template11 from '../components/templates/Template11';
import Template12 from '../components/templates/Template12';

export const templates = [
  { name: 'Classic', component: Template1 },
  { name: 'Professional', component: Template2 },
  { name: 'Minimal', component: Template3 },
  { name: 'Corporate', component: Template4 },
  { name: 'Fresh Green', component: Template5 },
  { name: 'Bold Red', component: Template6 },
  { name: 'Ocean Blue', component: Template7 },
  { name: 'Elegant', component: Template8 },
  { name: 'Modern', component: Template9 },
  { name: 'Dark Premium', component: Template10 },
  { name: 'Gradient Pink', component: Template11 },
  { name: 'Nature Green', component: Template12 },
];

export const getTemplate = (templateNumber) => {
  return templates[templateNumber - 1]?.component || templates[0].component; // Default to Template1 if not found
};
