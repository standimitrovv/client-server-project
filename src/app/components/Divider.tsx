interface Props {
  side?: 'b' | 't';
}

export const Divider: React.FC = ({ side = 'b' }: Props) => {
  return <div className={`border-${side} border-t`} />;
};
