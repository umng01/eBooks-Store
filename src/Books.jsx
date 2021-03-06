import React, { useState } from 'react';
import './App.css';
import { Card, CardTitle, CardImg, CardBody, Button, Modal } from 'reactstrap';
const Books = ({thumbnail,title,pageCount,language,description,authors,publisher,previewLink,infoLink
}) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <Card className='m-auto card '>
      <CardImg
        top
        style={{ width: '100%', height: '233px' }}
        src={thumbnail}
        alt={title}
      />
      <CardBody>
        <CardTitle className='card-title'>{title}</CardTitle>
        <Button onClick={toggle} className='button-click'>More Info</Button>
      </CardBody>
      <Modal isOpen={modal} toggle={toggle}>
        <div className='modal-header d-flex justify-content-right'>
          <h5 className='modal-title text-right' id='exampleModalLabel'>{title}</h5>
          <button
            aria-label='Close'
            className='closed d-flex justify-content-between'
            type='button'
            onClick={toggle}
          >
            <span aria-hidden={true}>X</span>
          </button>
        </div>
        <div className='modal-body'>
          <div className='d-flex justify-content-between ml-3'>
            <img className="image" src={thumbnail} alt={title} />
            <div className='cards'>
              <p>Author : {authors}</p>
              <p>Publisher : {publisher}</p>
              <p>Language : {language}</p>
              <p>Total Pages: {pageCount}</p>
            </div>
          </div>
          <div className='mt-3'>{description}</div>
        </div>
        <div className='modal-footer'>
          <div className='left-silde'>
            <a
              href={previewLink}
              className='btn-link'
              color='default'
              type='button'
              target='_blank'
              rel='noopener noreferrer'
            >
              Preview
            </a>
          </div>
          <div className='divider'></div>
          <div className='right-silde'>
            <a
              href={infoLink}
              className='btn-link'
              color='default'
              type='button'
              target='_blank'
              rel='noopener noreferrer'
            >
              Information
            </a>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default Books;