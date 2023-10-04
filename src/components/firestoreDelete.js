import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase.js';

function eliminarPost(docID, selectedUserName) {
  const postRef = doc(db, 'dataBase2', docID);

  return getDoc(postRef)
    .then((postDoc) => {
      if (!postDoc.exists()) {
        console.log('No existe el post que intentas eliminar');
        return Promise.reject('No existe el post que intentas eliminar');
      }

      const userName = postDoc.data().userID;
      console.log('userID:', userID);
      console.log('selectedUserName:', selectedUserName);
      if (userName !== selectedUserName) {
        console.log('La propiedad userName no está presente en el documento.');
        console.log('No tienes permisos para eliminar este post');
        return Promise.reject('No tienes permisos para eliminar este post');
      }

      return deleteDoc(postRef)
        .then(() => {
          console.log('Post eliminado correctamente');
        })
        .catch((error) => {
          console.error('Error al eliminar el post:', error);
          return Promise.reject(error);
        });
    });
}

export default eliminarPost;
