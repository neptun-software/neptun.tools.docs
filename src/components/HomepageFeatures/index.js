import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Web Interface",
    image: {
      /* svg: require('@site/static/img/banner.svg').default, */
      png: require("@site/static/img/logo-web-banner.png").default,
    },
    description: (
      <>
        NeptunAI kann über unsere Web-Schnittstelle als SaaS (Software as a
        Service) genutzt werden. Self-hosting ist ebenfalls möglich.
      </>
    ),
  },
  {
    title: "CLI Tool",
    image: {
      /* svg: require('@site/static/img/banner.svg').default, */
      png: require("@site/static/img/logo-cli-banner.png").default,
    },
    description: (
      <>
        NeptunAI kann mit unserem CLI-Tool verwendet werden, das über npm und
        apt verfügbar ist.
      </>
    ),
  },
];

function Feature({ image, title, description }) {
  const Svg = image.svg;
  const imageSrc = image.png;

  return (
    <div className={clsx("col col--6")}>
      <div className="text--center">
        {image.svg ? (
          <Svg className={styles.featureSvg} role="img" />
        ) : (
          <img className={styles.featurePng} src={imageSrc} role="img" />
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
