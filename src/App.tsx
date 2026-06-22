import PhoneMockup from './PhoneMockup';
import SocialScreen from './screens/SocialScreen';

export default function App() {
  return (
    <div style={{
      minHeight: '100dvh',
      background: 'linear-gradient(135deg, #e8edf2 0%, #d4dce6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'auto',
      padding: '48px 32px',
    }}>
      <PhoneMockup>
        <SocialScreen />
      </PhoneMockup>
    </div>
  );
}
