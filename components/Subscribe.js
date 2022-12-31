const Subscribe = () => {
    return (
        <div className='flex justify-center bg-base-100 py-20'>
            <div className="form-control">
                <label className="label">
                    <span className="text-lg">Subscribe to get information about our latest artworks</span>
                </label>
                <label className="input-group">
                    <span>Email</span>
                    <input type="text" placeholder="your@email.com" className="input input-bordered" />
                    <button className="btn uppercase">Subscribe</button>
                </label>
            </div>
        </div>
    );
};

export default Subscribe;