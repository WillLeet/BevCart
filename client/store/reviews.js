import axios from "axios"

const SET_REIVEWS = "SET_REVIEWS"
const CREATE_REVIEW = "CREATE_REVIEW"
const UPDATE_REIVEW = "UPDATE_REVIEW"
const DELETE_REVIEW = "DELETE_REVIEW"

const setReviews = (reviews) => {
    return ({
      type: SET_REIVEWS,
      reviews
    })
  };
  
  const createdReview = (review) => {
    return {
      type: CREATE_REVIEW,
      review
    };
  }
  
  const deletedReview = (item) => {
    return {
      type: DELETE_REVIEW,
      review
    }
  }
  
  const updatedReview = (item) => {
    return {
      type: UPDATE_REIVEW,
      review
    };
  };
  
  export const fetchReviews = (productId) => {
    return async (dispatch) => {
      try {
        const {data} = await axios.get(`/api/review/${productId}`)
        dispatch(setReviews(data))
      } catch (err) {
        console.error(err)
      }
    }
  };
  
  export const createReview = (review) => {
    return async (dispatch) => {
      const { data: added} = await axios.post(`/api/review/${review.productId}/${review.userId}`, review);
      dispatch(createdReview(added));
    };
  };
  
  export const deleteReview = (productId,userId) => {
    return async (dispatch) => {
      const {data: removed} = await axios.delete(`/api/review/${productId}/${userId}`)
      dispatch(deletedReview(removed))
    }
  }
  
  export const updateReview = (review) => {
    return async (dispatch) => {
        const { data: updated} = await axios.put(`/api/review/${review.productId}/${review.userId}`, review);
        dispatch(updatedReview(updated));
    }
  }

export default function cartReducer(reviews = [], action) {
    switch (action.type) {
      case SET_REIVEWS:
        return action.reviews
      case CREATE_REVIEW:
        return [...reviews, action.review];
      case UPDATE_REIVEW:
        return reviews.map(review => (review.id === action.review.id ? action.review : review))
      case DELETE_REVIEW:
        return cart.filter(review => review.id !== action.review.id)
      default:
        return reviews;
    }
  }