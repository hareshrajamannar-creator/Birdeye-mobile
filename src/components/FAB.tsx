import { MdAdd } from 'react-icons/md';
import { Colors } from '../tokens';

export default function FAB() {
  return (
    <button style={{
      position:'absolute', bottom:100, right:20,
      width:52, height:52, borderRadius:26,
      background: Colors.primary,
      border:'none', cursor:'pointer',
      display:'flex', alignItems:'center', justifyContent:'center',
      boxShadow:'0 4px 14px rgba(25,118,210,0.45)',
      zIndex:20,
    }}>
      <MdAdd size={26} color="#fff" />
    </button>
  );
}
