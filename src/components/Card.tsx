import { FC } from 'react';
import { withSourceCode } from 'react-source-code';

interface Props {
  image: string;
  selected: boolean;
  onClick: () => void;
}

const Card = ({ image, selected, onClick }: Props) => {
  return (
    <div className='card' onClick={onClick}>
      <div className={selected ? 'selected' : ''}>
        <img className='card-face' src={image} alt={image} />
        <img className='card-back' src='/assets/git.png' alt='backcard' />
      </div>
    </div>
  );
};

export default withSourceCode(Card as FC, 'src/components/Card');
