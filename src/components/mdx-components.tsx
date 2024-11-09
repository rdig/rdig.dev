import { FC, createElement } from "react";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Fira_Code } from "next/font/google";

type LayoutWrapperProps = {
  type: string;
  className?: string;
};

const firaCode = Fira_Code({ subsets: ["latin"] });

const LayoutWrapper = ({ type, className, ...originalProps }: LayoutWrapperProps) => {
  const props = {
    ...originalProps,
    className: 'pb-3',
  };
  if (className) {
    props.className += ` ${className}`;
  }
  return createElement(type, props);
};

const components = {
  Image: (props: any) => {
    const sanitizedProps = { ...props };
    delete sanitizedProps.width;
    delete sanitizedProps.height;
    const { alt, className, src, caption } = sanitizedProps;
    return (
      <div className={`mt-3 mb-6 pr-3`}>
        <a href={src} target="_blank" title={alt || caption}>
          <Image
            className={`!relative ${className ?? ''} rounded-md my-0`}
            alt={alt || caption}
            priority={false}
            fill
            {...sanitizedProps}
          />
        </a>
        {(caption) && <figcaption className="text-xs italic text-zinc-500 dark:text-zinc-400 my-0 mt-1">{caption}</figcaption>}
      </div>
    );
  },
  a: (props: any) => {
    /*
     * Poor man's attempt at distinguishing internal and external links.
     */
    if (props.href.startsWith("/")) {
      return <a {...props} />;
    }
    return <a {...props} target="_blank" rel="noopener noreferrer" />;
  },
  code: (props: any) => {
    return <LayoutWrapper type="code" className={`${firaCode.className} rounded-md`} {...props} />;
  },
  // Headings
  ...Object.assign(
    {},
    ...['h2', 'h3', 'h4'].map((tag: string) => ({
      [tag]: (props: any) => {
        const headingSizes: { [key: string]: string } = {
          h2: 'text-2xl',
          h3: 'text-xl',
          h4: 'text-base',
        };
        return (
          <LayoutWrapper type={tag} className={`pt-8 font-medium ${headingSizes[tag]}`} {...props} />
        );
      },
    })),
  ),
  /*
   * Rest
   */
  ...Object.assign(
    {},
    ...['p', 'pre', 'blockquote'].map(tag => ({
      [tag]: (props: any) => <LayoutWrapper type={tag} {...props} />,
    })),
  ),
  // disabled
  ...Object.assign(
    {},
    ...['ol', 'ul', 'table', 'hr'].map(tag => ({
      [tag]: (props: any) => null,
    })),
  ),
};

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
