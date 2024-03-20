export default function symbolDemo() {
  return (
    <p>
      - symbol 引用：
      <svg className="icon" aria-hidden="true">
        <use xlinkHref="#icon-like__easyico"></use>
      </svg>
      <svg className="icon" aria-hidden="true">
        <use xlinkHref="#icon-zan"></use>
      </svg>
    </p>
  );
}
