import { getIcon } from 'material-file-icons';
import { CSSProperties } from 'styled-components';

interface FileIconProps {
  filename: string;
  style?: CSSProperties;
  className?: string;
}

function FileIcon({ filename, style, className }: FileIconProps) {
  return <div 
    style={style}
    className={className}
    dangerouslySetInnerHTML={{ __html: getIcon(filename).svg }}
  />;
}

export default FileIcon;