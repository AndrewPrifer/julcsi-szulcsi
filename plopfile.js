module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?',
      },
      {
        type: 'list',
        name: 'type',
        message: 'What is the type of the component?',
        choices: ['component', 'container'],
      },
    ],
    actions: [
      {
        type: 'add',
        // language=Handlebars
        path: 'src/{{type}}s/{{name}}/index.tsx',
        templateFile: 'plop-templates/component.hbs',
      },
      {
        type: 'add',
        // language=Handlebars
        path: 'src/{{type}}s/{{name}}/story.tsx',
        templateFile: 'plop-templates/story.hbs',
      },
    ],
  });
}
