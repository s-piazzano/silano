import styles from "./header.module.css";

export default function Header({ subtitle, title, slogan }) {
  return (
    <div className={`h-screen ${styles.background}`}>
      <div
        className={`w-full h-4/6 flex flex-col justify-center  items-center  text-stone-600  landscape:mt-20 md:landscape:mt-0`}
      >
        <div className="text-center">
          <p
            id="homepageSubtitle"
            className="text-xs lg:text-base font-extralight opacity-0 uppercase "
          >
            {subtitle}
          </p>
          <h1
            id="homepageTitle"
            className="text-6xl lg:text-8xl font-extralight opacity-0"
          >
            {title}
          </h1>
          <h4 id="homepageSlogan" className="opacity-0 font-thin">
            {slogan}
          </h4>
        </div>
      </div>
    </div>
  );
}
