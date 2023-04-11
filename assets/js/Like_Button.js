
// 'use strict';

// const e = React.createElement;

// function LikeButton(props) {
//     const [liked, setLiked] = React.useState(false)

//     if (liked) {
//         return 'You liked this.';
//     }

//     return e(
//         'button',
//         { onClick: () => setLiked(true) },
//         'Like'
//     );
// }

// const domContainer = document.querySelector('#like_button_container');
// const root = ReactDOM.createRoot(domContainer);
// root.render(e(LikeButton));

'use strict';

const e = React.createElement;

function LikeButton(props) {
    const [liked, setLiked] = React.useState(false)

    const buttonStyle = {
        backgroundColor: 'red',
        color: 'green',
        fontSize: '20px',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        margin: '10px'
    }

    if (liked) {
        return <p style={{ color: 'green' }}>You liked this.</p>;
    }

    return (
        <button style={buttonStyle} onClick={() => setLiked(true)}>Like</button>
    );
}

const domContainer = document.querySelector('#like_Button');
const root = ReactDOM.createRoot(domContainer);
root.render(<LikeButton />);
