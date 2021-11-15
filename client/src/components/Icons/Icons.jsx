import IconsSVG from './sprite.svg';

export default function Icons({ spriteId, className }) {
  const classNames = className ? className : spriteId;

  return (
    <svg className={`${classNames}`}>
      <use xlinkHref={`${IconsSVG}#${spriteId}`} />
    </svg>
  );
}
