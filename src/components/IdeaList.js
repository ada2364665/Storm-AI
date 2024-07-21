import styles from "./IdeaList.module.css";
import images from "../constants/images.js"

const IdeaList = ({ idea, onApprove, onDecline }) => {
  return (
    <>
      {
        idea.map((ideas, index) => (
          <div className={styles["idea-list"]} key={index}>
            <div className={styles["idea-item"]}>
              { ideas.idea ? <h2>{ideas.idea}</h2> : <h2>{ideas.name}</h2> }
              <div className={styles.description}>{ideas.description}</div>
              <div className={styles.buttons}>
                <button onClick={() => onApprove(index)}><img src={images.approve} alt="" />Approve</button>
                <button onClick={() => onDecline(index)}><img src={images.reject} alt="" />Reject</button>
              </div>
            </div>
          </div>
        ))
      }
    </>
  );
};

export default IdeaList;
