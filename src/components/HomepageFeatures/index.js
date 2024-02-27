import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Web Interface',
    Svg: require('@site/static/img/banner.svg').default,
    description: (
      <>
        NeptunAI can be used through our web interface as a SaaS (Software as a Service), but you also have the option to host it yourself.
      </>
    ),
  },
  {
    title: 'CLI Tool',
    Svg: require('@site/static/img/banner.svg').default,
    description: (
      <>
        NeptunAI can be used with our CLI tool, which is available on npm and apt.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
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
