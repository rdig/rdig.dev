import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";

const components = {
  Image: (props: any) => {
    const sanitizedProps = { ...props };
    delete sanitizedProps.width;
    delete sanitizedProps.height;
    const { alt, className, src, caption } = sanitizedProps;
    return (
      <div className="my-8">
        <a href={src} target="_blank" title={caption || alt}>
          <Image
            className={`!static ${className ?? ''} rounded-md my-0`}
            alt={alt}
            fill
            {...sanitizedProps}
          />
        </a>
        {(caption || alt) && <span className="text-sm italic text-zinc-500 dark:text-zinc-400">{caption || alt}</span>}
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
};

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
