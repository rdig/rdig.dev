import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";

const components = {
  Image: (props: any) => {
    const sanitizedProps = { ...props };
    delete sanitizedProps.width;
    delete sanitizedProps.height;
    const { alt, className } = sanitizedProps;
    return (
      <Image
        className={`!static ${className ?? ''}`}
        alt={alt}
        fill
        {...sanitizedProps}
      />
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
