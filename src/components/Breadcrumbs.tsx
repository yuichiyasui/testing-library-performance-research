import Link from "next/link";

type Props = {
  list: {
    name: string;
    href: string;
  }[];
};

export const Breadcrumbs = ({ list }: Props) => {
  return (
    <nav aria-label="パンくずリスト" className="breadcrumbs">
      <ul>
        {list.map((item, index) => {
          const isLast = index === list.length - 1;
          return (
            <li key={item.href}>
              {isLast ? (
                <a aria-current="true">{item.name}</a>
              ) : (
                <Link href={item.href} className="text-blue-600">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
