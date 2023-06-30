import React, { useState } from "react";
import '.././styles/Home.css';
import { isWebUri } from 'valid-url';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from "react-bootstrap/Tooltip";
import { shortenLink } from "../Service";

const Home = () => {
  const [originalLink, setOriginalLink] = useState('');
  const [shortenedLink, setShortenedLink] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [errorMessages, setErrorMessage] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);  
  const [tooltipMessage, setTooltipMessage] = useState('Copy to clipboard');

  let generatedLink = `${process.env.REACT_APP_API_URL}/${shortenedLink}`;

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //TODO: add custom links.
    setOriginalLink(event.target.value);
  };

  const handleShortenLink = async () => {
    const validationError = validateInput();
    if (validationError) console.log(validationError) //TODO: Show error message.

    try {
      const shortenedURL = await shortenLink(originalLink);
      setShortenedLink(shortenedURL);
      console.log(shortenedURL)
    } catch (error) {
      errors.push('Failed to request shortened URL.');
      setErrors(errors);
    }
  };

  const hasError = (key: any) => {
    return errors.indexOf(key) !== -1;
  }

  const validateInput = async () => {
    if ('' === originalLink.trim()) {
      errors.push("originalLink");
      errorMessages['originalLink'] = 'Empty field.';
      return;
    } else if (!isWebUri(originalLink)) {
      errors.push("originalLink");
      errorMessages["originalLink"] = 'Invalid URL.';
      return;
    }

    setErrors(errors);
    setErrorMessage(errorMessages);
    setLoading(false);

    return errors.length === 0;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setTooltipMessage('Copied!');
  }

  return (
    <div className="container">
      <form autoComplete="off">
        <h3>Tiny Link</h3>

        <div className="form-group">
          <label htmlFor="">Enter original URL</label>
          <input 
            id="originalURL"
            onChange={handleLinkChange}
            value={originalLink}
            type="url"
            required
            placeholder="https://www..."
            className={
              hasError("originalURL") ?
              "form-control is-valid"
              :
              "form-control"
            }
             />
        </div>
        <div
          className={
            hasError("originalURL") ?
            "text-danger"
            :
            "visually-hidden"
          }
        >
          {errorMessages.originalURL}
        </div>

        {/* <div className="form-group">
          <label htmlFor="basic-url"> Shortened Link</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">someURL.com/</span>
            </div>
          </div>
        </div> */}

        <button className="btn btn-primary" type="button" onClick={handleShortenLink}>
          {loading ? (
            <div>
              <span
                className="spinner=border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </div>
          ) : (
            <div>
              <span
                className="visually-hidden spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span>Submit</span>
            </div>
          )}
        </button>

        {shortenedLink === '' ? (
          <div></div>
        ) : (
          <div className="shortenedLink">
            <span>Shortened Link: </span>
            <div className="input-group mb-3"></div>
            <input 
              disabled
              type="text"
              value={generatedLink}
              className="form-control"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <OverlayTrigger
                key={'top'}
                placement={'top'}
                overlay={
                  <Tooltip id={`tooltip-${'top'}`}>
                    {tooltipMessage}
                  </Tooltip>
                }
              >
                <button
                    onClick={() => copyToClipboard()}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Tooltip on top"
                    className="btn btn-outline-secondary"
                    type="button"
                  >
                    Copy
                  </button>
              </OverlayTrigger>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default Home