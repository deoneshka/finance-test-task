import IconsSVG from './sprite.svg';

export default function Icons({ id, className }) {
  const classNames = className ? className : id;
  return (
    <svg className={`${classNames}`}>
      <use xlinkHref={`${IconsSVG}#${id}`} />
    </svg>
  );
}
