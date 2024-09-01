import React from "react";
import styles from "./Home2.module.css";
import Lottie from "react-lottie";
import animation1 from "../../Content/Lottie/Animation - 1725085639361.json";
import animation2 from "../../Content/Lottie/Animation - 1725086452498 (1).json";
import animation3 from "../../Content/Lottie/Animation - 1725086730999.json";
import LottieAnimation from "../Common/LottieAnimation";
const Home2 = () => {
  return (
    <div className={styles.siteHeader}>
      <main>
        {/* Section 1 */}
        <section className={styles.section}>
          <div className={`${styles.content} ${styles.blink}`}>
            <div className="flex flex-col pt-[15vh] md:flex-row my-auto overflow-auto justify-center items-center p-4 space-y-4 md:space-y-0 md:space-x-4">
              <LottieAnimation
                path={animation2}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
              />
              <div className="flex flex-col justify-center items-center text-center md:text-left w-full md:w-1/2 lg:w-2/3">
                <p>
                  By setting the <code>.content</code> elements to{" "}
                  <code>position: fixed</code>, we can now transition between
                  them without a visible scrolling movement.
                </p>
                <p>
                  We create a normal <code>@keyframe</code> animation to our
                  liking to transition between them. Check the navigation menu
                  to see different effects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className={styles.section}>
          <div className={`${styles.content} ${styles.blink}`}>
            <div className="flex flex-col pt-[15vh] md:flex-row my-auto overflow-auto justify-center items-center p-4 space-y-4 md:space-y-0 md:space-x-4">
              <LottieAnimation
                path={animation3}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
              />
              <div className="flex flex-col justify-center items-center text-center md:text-left w-full md:w-1/2 lg:w-2/3">
                <p>
                  By setting the <code>.content</code> elements to{" "}
                  <code>position: fixed</code>, we can now transition between
                  them without a visible scrolling movement.
                </p>
                <p>
                  We create a normal <code>@keyframe</code> animation to our
                  liking to transition between them. Check the navigation menu
                  to see different effects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className={styles.section}>
          <div className={`${styles.content} ${styles.blink}`}>
            <div className="flex flex-col pt-[15vh] md:flex-row my-auto overflow-auto justify-center items-center p-4 space-y-4 md:space-y-0 md:space-x-4">
              <LottieAnimation
                path={animation1}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
              />
              <div className="flex flex-col justify-center items-center text-center md:text-left w-full md:w-1/2 lg:w-2/3">
                <p>
                  By setting the <code>.content</code> elements to{" "}
                  <code>position: fixed</code>, we can now transition between
                  them without a visible scrolling movement.
                </p>
                <p>
                  We create a normal <code>@keyframe</code> animation to our
                  liking to transition between them. Check the navigation menu
                  to see different effects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className={styles.section}>
          <div className={`${styles.content} ${styles.blink}`}>
            <div className="flex flex-col pt-[15vh] md:flex-row my-auto overflow-auto justify-center items-center p-4 space-y-4 md:space-y-0 md:space-x-4">
              <LottieAnimation
                path={animation1}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
              />
              <div className="flex flex-col justify-center items-center text-center md:text-left w-full md:w-1/2 lg:w-2/3">
                <p>
                  By setting the <code>.content</code> elements to{" "}
                  <code>position: fixed</code>, we can now transition between
                  them without a visible scrolling movement.
                </p>
                <p>
                  We create a normal <code>@keyframe</code> animation to our
                  liking to transition between them. Check the navigation menu
                  to see different effects.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home2;
