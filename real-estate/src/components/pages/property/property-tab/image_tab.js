import React, { useEffect } from "react";
import "./property.css";

function Image_tab(props) {
    const { property } = props;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!property) {
        return <h1>No data available</h1>;
    }

    return (
        <div className="property-images-top">
            <div className="propert-main-img">
                <img 
                    src={`data:image/jpeg;base64,${property.mainImage}`} 
                    alt={`Main view of ${property.name}`} 
                    className="property-img-main i-1" 
                />
            </div>
            <div className="propert-main-img">
                <div className="property-grp-1">
                    <img 
                        src={`data:image/jpeg;base64,${property.image1}`} 
                        alt={`${property.feature1}`} 
                        className="property-img i-2" 
                    />
                    <img 
                        src={`data:image/jpeg;base64,${property.image2}`} 
                        alt={`${property.feature2}`} 
                        className="property-img i-3" 
                    />
                </div>
                <div className="property-grp-1">
                    <img 
                        src={`data:image/jpeg;base64,${property.image3}`} 
                        alt={`${property.feature3}`} 
                        className="property-img i-2" 
                    />
                    <img 
                        src={`data:image/jpeg;base64,${property.image4}`} 
                        alt={`${property.feature4}`} 
                        className="property-img i-3" 
                    />
                </div>
            </div>
        </div>
    );
}

export default Image_tab;
