import { FC, createElement } from "react";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";

type LayoutWrapperProps = {
  type: string;
  className?: string;
};

const LayoutWrapper = ({ type, className, ...originalProps }: LayoutWrapperProps) => {
  const props = {
    ...originalProps,
    className: 'max-w-3xl mx-auto py-2',
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
      <div className="my-8 max-w-6xl mx-auto">
        <a href={src} target="_blank" title={caption || alt}>
          <Image
            className={`!static ${className ?? ''} rounded-md my-0`}
            alt={alt}
            fill
            {...sanitizedProps}
          />
        </a>
        {(caption || alt) && <p className="text-sm italic text-zinc-500 dark:text-zinc-400 my-0 mt-1 text-center">{caption || alt}</p>}
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
  hr: (props: any) => <LayoutWrapper type="hr" className="max-w-[6rem] py-0 border-zinc-400" {...props} />,
  /*
   * Rest
   */
  ...Object.assign(
    {},
    ...['p', 'pre', 'blockquote', 'h2', 'h3', 'h4', 'ol', 'ul', 'table'].map(tag => ({
      [tag]: (props: any) => <LayoutWrapper type={tag} {...props} />,
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
