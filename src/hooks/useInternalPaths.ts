import { graphql, useStaticQuery } from "gatsby"

const useInternalPaths = () => {
  const {
    pages: { nodes },
  } = useStaticQuery(graphql`
    {
      pages: allSitePage {
        nodes {
          path
        }
      }
    }
  `)

  return nodes.map((node: { path: any }) => node.path)
}

export default useInternalPaths
