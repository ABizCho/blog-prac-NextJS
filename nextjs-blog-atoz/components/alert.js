import styles from "./alert.module.css";
import { clsx } from "clsx";
// clsx라는 스타일 lib을 통해, type props에 따른 클래스네임 변경 쉽게 수행

export default function Alert({ children, type }) {
  return (
    <div
      className={clsx({
        // clsx 이용해, 컴포넌트의 type prop에 따라, CSS 모듈 적용
        [styles.success]: type === "success",
        [styles.error]: type === "error",
      })}
    >
      {children}
    </div>
  );
}
