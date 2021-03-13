const path = require("path")

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query GetRecipes {
      content: allContentfulRecipe {
        nodes {
          slug
          content {
            ingredients
            tags
          }
        }
      }
    }
  `)

  result.data.content.nodes.forEach(recipe => {
    createPage({
      path: `/${recipe.slug}`,
      component: path.resolve(`src/templates/recipe-template.js`),
      context: {
        slug: recipe.slug,
      },
    })
    recipe.content.tags.forEach(tag => {
      createPage({
        path: `/${tag}`,
        component: path.resolve(`src/templates/tag-template.js`),
        context: {
          tag: tag,
        },
      })
    })
  })
}
