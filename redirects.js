const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // Add home page redirect to default language
  const homePageRedirect = {
    source: '/',
    destination: '/cs',
    permanent: false,
  }

  const redirects = [internetExplorerRedirect, homePageRedirect]

  return redirects
}

export default redirects
