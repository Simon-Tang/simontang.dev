const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  const { setWebpackConfig } = actions;
  setWebpackConfig({
    resolve: {
      modules: [__dirname, 'node_modules'],
    },
  });
};

exports.createPages = ({ actions, graphql }) => {
  const { createRedirect, createPage } = actions;
  createRedirect({ fromPath: '/code', toPath: '/', isPermanent: false });
  createRedirect({ fromPath: '/posts', toPath: '/', isPermanent: false });

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allContentfulResume {
            edges {
              node {
                slug
                person {
                  __typename
                  ... on Node {
                    ... on ContentfulPerson {
                      firstName
                      lastName
                      website
                      gitHub
                      linkedIn
                      email
                    }
                  }
                }
                resumeUrl
                subtitle
                experienceCaption
                experiences {
                  __typename
                  ... on Node {
                    ... on ContentfulResumeExperience {
                      company
                      companyUrl
                      position
                      dateRange
                      experienceDescription {
                        json
                      }
                    }
                  }
                }
                educationSchool
                educationRange
                educationDegree
                interests
              }
            }
          }
          allContentfulPost {
            edges {
              node {
                slug
                title
                body {
                  json
                }
              }
            }
          }
          allContentfulProjectPage {
            edges {
              node {
                slug
                title
                layout
                projectIframeUrl
                descriptionTitle
                descriptionBody {
                  json
                }
                linksBody {
                  json
                }
              }
            }
          }
          allContentfulTypingTest {
            edges {
              node {
                title
                slug
                categories
                preview
                passage {
                  passage
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        const resumes = result.data.allContentfulResume.edges;
        resumes.forEach(resume => {
          const {
            slug,
            person: { firstName, lastName, gitHub, linkedIn, email },
            resumeUrl,
            subtitle,
            experienceCaption,
            experiences = [],
            educationSchool,
            educationRange,
            educationDegree,
            interests = [],
          } = resume.node;

          createPage({
            path: slug,
            component: path.resolve('./src/layouts/resume-page.tsx'),
            context: {
              name: `${firstName} ${lastName}`,
              subtitle,
              gitHub,
              linkedIn,
              email,
              website: resumeUrl || website,
              experienceCaption,
              experiences,
              educationSchool,
              educationRange,
              educationDegree,
              interests,
            },
          });
        });

        const posts = result.data.allContentfulPost.edges;
        posts.forEach(post => {
          const {
            slug,
            title,
            body: { json: bodyJson },
          } = post.node;
          createPage({
            path: `posts/${slug}`,
            component: path.resolve('./src/layouts/post-page.tsx'),
            context: {
              id: `posts/${slug}`,
              slug,
              title,
              bodyJson,
            },
          });
        });

        const projectPages = result.data.allContentfulProjectPage.edges;
        projectPages.forEach(projectPage => {
          const {
            slug,
            title,
            layout,
            projectIframeUrl,
            descriptionTitle,
            descriptionBody: { json: descriptionBodyJson },
            linksBody: { json: linksBodyJson },
          } = projectPage.node;
          createPage({
            path: `code/${slug}`,
            component: path.resolve('./src/layouts/project-page.tsx'),
            context: {
              title,
              layout,
              projectIframeUrl,
              descriptionTitle,
              descriptionBodyJson,
              linksBodyJson,
            },
          });
        });

        const typingTests = result.data.allContentfulTypingTest.edges.map(
          ({ node }) => ({
            ...node,
            passage: node.passage.passage,
          }),
        );
        typingTests.forEach(typingTest => {
          const { slug } = typingTest;
          createPage({
            path: `terrible-online-typing-tests/${slug}`,
            component: path.resolve('./src/layouts/typing-test-page.tsx'),
            context: { typingTest },
          });
        });
      }),
    );
  });
};
