import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import { fetchImages } from './api';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      try {
        const data = await fetchImages(this.state.query, this.state.page);
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          page: 1,
          showBtn: prevState.page < Math.ceil(data.totalHits / 20),
        }));
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = (value) => {
    this.setState({ query: value, page: 1, images: [] }, () => {
      this.fetchImages();
    });
  };

  handleLoadMore = () => {
    this.fetchImages();
  };

  handleImageClick = (largeImageURL) => {
    this.setState({ showModal: true, selectedImage: largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  render() {
    const { images, isLoading, showModal, selectedImage } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} onClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal largeImageURL={selectedImage} onClose={this.handleCloseModal} />
        )}
      </div>
    );
  }
}

export default App;