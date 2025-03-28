import ReactLoading from 'react-loading';

const WaitingState = () => {
    return (
        <div className="flex items-center justify-center z-10 top-0 h-full">
            <ReactLoading type="spinningBubbles" color="#6d7ae7" height={50} width={50} />
        </div>
    );
};

export default WaitingState;