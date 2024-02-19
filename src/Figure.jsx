

function Figure({apodData, marsData, category}) {
  return (
    <div>
        {category === "apod" ? (
        <>
            {apodData.media_type === 'video' ? <p className="message">No image found for this data</p> : <p><img src={apodData.url} alt="image"/></p> }
            <h3>Title- {apodData.title}</h3>
            <div className="box">
                <p><b>Date of the image</b>- {apodData.date}</p>
                <p><b>Copyright</b>- {apodData.copyright ?  apodData.copyright : "Not copyrighted"}</p>
            </div>
            <p><b>Details</b>- <i>{apodData.explanation}</i></p>
        </>
        ): 
        (
        <>
        {marsData !== undefined ? (
            <>
            <p><img src={marsData.img_src} alt="image"/></p>
            <div className="box">
                <p><b>Earth date of the image</b>- {marsData.earth_date}</p>
            </div>
            </>
          ): 
            <p className="message">No photo is found</p>
        }
        </>
        )
        }
    </div>
  )
}

export default Figure;