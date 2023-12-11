import React from "react";
import styles from "./../Inspiration.module.css";

function FlowerList({ flowerList, activeCheckbox, setActiveCheckbox }) {
  return (
    <div className={styles.generate__type}>
      {flowerList.map((flower, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={index === activeCheckbox}
            onClick={() => setActiveCheckbox(index)}
          />
          <label>{flower}</label>
        </div>
      ))}
    </div>
  );
}

export default FlowerList;
