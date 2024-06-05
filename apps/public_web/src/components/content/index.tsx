"use client";

export type ContentListProps = {
  title: string;
  subTitle?: string;
  list: Array<{
    paragraph: string | JSX.Element;
    icon?: JSX.Element;
  }>;
};
export default function ContentList({
  title,
  subTitle,
  list,
}: ContentListProps): JSX.Element {
  return (
    <div className="flex-grow h-full flex flex-col gap-8 bg-slate-50 px-4 py-20 relative">
      <h3 className="text-3xl font-bold text-primary mx-auto">{title}</h3>
      <h3 className="text-[120px] font-bold text-primary mx-auto absolute top-[-60px] left-0 whitespace-nowrap w-full text-center text-transparent pointer-events-none ">
        {title}
      </h3>
      {subTitle && <p className="text-sm">{subTitle}</p>}
      {list.map(({ paragraph, icon }, index) => (
        <div
          key={`contentlist-${title}-${index}`}
          className="w-full flex items-start gap-4"
        >
          <div className="min-w-10 min-h-10 w-10 h-10 flex items-center justify-center flex-1">
            {icon}
          </div>
          <p>{paragraph}</p>
        </div>
      ))}
    </div>
  );
}
