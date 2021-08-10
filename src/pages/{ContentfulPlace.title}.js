import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { FaMapMarkerAlt, FaCar, FaBus } from "react-icons/fa"
import Layout from "../components/Layout"
import slugify from "slugify"
import SEO from "../components/SEO"

const PlaceTemplate = ({ data }) => {
  const {
    title,
    carTime,
    transportTime,
    content,
    adress,
    findLocation,
    description: { description },
    image,
  } = data.contentfulPlace
  const pathToImage = getImage(image)
  const { tags, instructions, ingredients, tools } = content
  return (
    <Layout>
      <SEO title={title} description={description} />
      <main className="page">
        <div className="place-page">
          {/* hero */}
          <section className="place-hero">
            <GatsbyImage
              image={pathToImage}
              alt={title}
              className="about-img"
            />
            <article className="place-info">
              <h2>{title}</h2>
              <p>{description}</p>
              {/* icons */}
              <div className="place-icons">
                <article>
                  <FaBus />
                  <h5>public transport</h5>
                  <p>{transportTime} min.</p>
                </article>
                <article>
                  <FaCar />
                  <h5>by car</h5>
                  <p>{carTime} min.</p>
                </article>
                <article>
                  <Link to={findLocation}>
                    <FaMapMarkerAlt />
                  </Link>
                  <h5>Open map</h5>
                </article>
              </div>
              {/* tags */}
              <p className="place-tags">
                Tags:
                {tags.map((tag, index) => {
                  const slug = slugify(tag, { lower: true })
                  return (
                    <Link to={`/tags/${slug}`} key={index}>
                      {tag}
                    </Link>
                  )
                })}
              </p>
            </article>
          </section>
          {/* rest of the content */}
          <section className="place-content">
            <article>
              <h4>description</h4>
              {instructions.map((item, index) => {
                return (
                  <div key={index} className="single-instruction">
                    <header>
                      <p>step {index + 1}</p>
                      <div></div>
                    </header>
                    <p>{item}</p>
                  </div>
                )
              })}
            </article>
            <article className="second-column">
              <div>
                <h4>ingredients</h4>
                {ingredients.map((item, index) => {
                  return (
                    <p key={index} className="single-ingredient">
                      {item}
                    </p>
                  )
                })}
              </div>
              <div>
                <h4>tools</h4>
                {tools.map((item, index) => {
                  return (
                    <p key={index} className="single-tool">
                      {item}
                    </p>
                  )
                })}
              </div>
            </article>
          </section>
        </div>
      </main>
    </Layout>
  )
}
export const query = graphql`
  query getSinglePlace($title: String) {
    contentfulPlace(title: { eq: $title }) {
      title
      carTime
      transportTime
      adress
      findLocation
      content {
        ingredients
        instructions
        tags
        tools
      }
      description {
        description
      }
      image {
        gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
      }
    }
  }
`
export default PlaceTemplate