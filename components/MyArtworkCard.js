const MyArtworkCard = ({ myArtwork }) => {
    const { name, image, category, price } = myArtwork;
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl w-full">
            <figure><img className="w-72 h-48 ml-5" src={image} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className="grow-0">Price range: {price} $</p>
                <p className="grow-0">Category: {category}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-primary">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default MyArtworkCard;