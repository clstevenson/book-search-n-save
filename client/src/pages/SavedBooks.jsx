import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

// set up Apollo client and mutations for this page
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

// management utilities for token and book IDs
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

// begin component definition
const SavedBooks = () => {
  // after removing a book refresh the page
  const [removeBook] = useMutation(REMOVE_BOOK, {
    refetchQueries: [ GET_ME, 'me' ]
  });

  // check for token
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  if (!token) return false;

  // retrieve saved books (without caching)
  const { loading, data } = useQuery(GET_ME, {
    fetchPolicy: 'network-only'
  });
  const user = data?.me || {};

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // CB function to remove book from the saved list (user presses "remove" button to call)
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      // user is not logged in
      return false;
    }

    try {
      const { data } = await removeBook({
        variables: { bookId },
      });

      if (data) {
        // upon success remove ID of deleted book from local storage
        // note that the GET_ME refetch/refresh is automatically triggered
        removeBookId(bookId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {user.savedBooks.length
            ? `Viewing ${user.savedBooks.length} saved ${user.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {user.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
