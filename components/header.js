import styles from "./header.module.css";

export default function Header({ subtitle, title, slogan }) {
  return (
    <div
      className={`w-full h-screen flex flex-col justify-center  items-center  text-stone-600 ${styles.background} landscape:mt-20 md:landscape:mt-0`}
    >
      <div className="text-center">

        <p id="homepageSubtitle" className="text-xs opacity-0  ">
          {subtitle}
        </p>
        <h1 id="homepageTitle" className="text-6xl opacity-0">
          {title}
        </h1>
        <h4 id="homepageSlogan" className="opacity-0">
          {slogan}
        </h4>
        
      </div>
    </div>
  );
}
