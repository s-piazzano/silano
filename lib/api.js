async function fetchApi(query, { variables } = {}) {
  const res = await fetch(`${process.env.STRAPI_BASE_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (res.ok) {
    return res.json();
  }
  console.error(res);
}

export async function getMenu(menuName) {
  const query = `
      query($menu:String){
        menus(filters: {name: {eq: $menu}}){
          data{
            attributes{
              logo{
                data{
                  attributes{
                    url
                  }
                }
              }
              hours,
              contact
              layout{
                __typename
                ...on ComponentDropdownMenu{
                  id,
                  name,
                  url,
                  type,
                  sections{
                    title,
                    pages{
                      data{
                        attributes{
                          title,
                          slug
                        }
                      }
                    }
                  }
                },
                ...on ComponentCommonLink{
                  linkName: name,
                  url,
                  icon
                }
              }
            }
          }
        }
      }
    `;
  const variables = {
    variables: {
      menu: menuName,
    },
  };

  const { data } = await fetchApi(query, variables);

  return {
    menu: {
      imageUrl: data.menus.data[0].attributes.logo.data.attributes.url,
      hours: data.menus.data[0].attributes.hours,
      contact: data.menus.data[0].attributes.contact,
      layout: data.menus.data[0].attributes.layout,
    },
  };
}

export async function getHomepage() {
  const query = `
  query($test:String){
    menus(filters: {name: {eq: $test}}){
      data{
        attributes{
          logo{
            data{
              attributes{
                url
              }
            }
          }
          hours,
          contact
          layout{
            __typename
            ...on ComponentDropdownMenu{
              id,
              name,
              url,
              type,
              sections{
                title,
                pages{
                  data{
                    attributes{
                      title,
                      slug
                    }
                  }
                }
              }
            },
            ...on ComponentCommonLink{
              linkName: name,
              url,
              icon
            }
          }
        }
      }
    }
    homepage{
      data{
        attributes{
          subtitle,
          title,
          slogan
          activities{
            id,
            title,
            description,
            link{
              name,
              url
            }
            image{
              data{
                attributes{
                  formats
                }
              }
            }
          }
        }
      }
    }
    footer{
      data{
        attributes{
          body{
            __typename
            ...on ComponentFooterCard{
              id
              name
              description
            }
            ...on ComponentMenuSection{
              id
              name
              links{
                name
                url
              }
            }
          }
        }
      }
    }
  }
  `;
  const variables = { variables: { menuName: "default" } };

  const { data } = await fetchApi(query, variables);

  return {
    menu: data.menus,
    homepage: data.homepage,
    footer: data.footer,
  };
}

export async function getAllPages() {
  const query = `
    query{
      pages{
        data{
          attributes{
            slug
          }
        }
      }}
  `;
  const { data } = await fetchApi(query);

  return data.pages.data;
}

export async function getPage(slug) {
  const query = `
  query($slug:String){
    pages(filters: {slug: {eq: $slug}}){
      data{
        attributes{
          slug,
          title,
          description,
          faq{
            id,
            question,
            answer
          }
          layout{
            __typename
            ...on ComponentPageDownload{
              id,
              title,
              links{
                id,
                name,
                url
              }
            }
            ...on ComponentCommonAssistant{
              id,
              avatar{
                data{
                  attributes{
                    url,
                    name
                  }
                }
              },
              description,
              button,
              assistan_option{
                data{
                  attributes{
                    steps,
                    result
                  }
                }
              }
            }
          }
        }
      }
    }
    footer{
      data{
        attributes{
          body{
            __typename
            ...on ComponentFooterCard{
              id
              name
              description
            }
            ...on ComponentMenuSection{
              id
              name
              links{
                name
                url
              }
            }
          }
        }
      }
    }
  }
  `;
  const variables = { variables: { slug } };

  const { data } = await fetchApi(query, variables);
  return { page: data.pages.data[0], footer: data.footer };
}

export async function getFooter() {
  const query = `
  query{
    footer{
      data{
        attributes{
          body{
            __typename
            ...on ComponentFooterCard{
              id
              name
              description
            }
            ...on ComponentMenuSection{
              id
              name
              links{
                name
                url
              }
            }
          }
        }
      }
    }
  }
  `;

  const { data } = await fetchApi(query, {});
  return { footer: data.footer };
}

export async function getContact() {
  const query = `
  query{
    contact{
      data{
        attributes{
          description
        }
      }
    }
  }
  `;

  const { data } = await fetchApi(query, {});
  return { contact: data.contact };
}

export async function getBakecaItems() {
  const query = `
  query{
    products(filters:{bakeca: {eq: true}} pagination: {pageSize: 20000}){
      data{
        id,
        attributes{
          updatedAt,
          OE,
          price,
          sub_category{
            data{
              attributes{
                name
              }
            }
          },
          compatibilities{
            make{
              data{
                attributes{
                  name
                }
              }
            },
            model{
              data{
                attributes{
                  name
                }
              }
            }
          }
          images{
            data{
              attributes{
                url
              }
            }
          }
        }
      }
    }
  }
  `;

  const { data } = await fetchApi(query, {});
  return data.products;
}
