import '../grimoire.css';
import SuccessImg from '../ChatGPT Image 2025年5月26日 11_01_19.png';
import FatalerrorImg from '../ChatGPT Image 2025年5月25日 23_45_42.png';
import { useLocation, useNavigate } from 'react-router-dom';
import bgImg from '../879077.jpg';

export const PotionCreateResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 成功 or 失敗の判定をクエリパラメータで受け取る
  const params = new URLSearchParams(location.search);
  const result = params.get('result');

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}>
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        {result === 'success' ? (
          <>
            <h1 style={{ color: '#4B8B3B', fontSize: '2.5em', marginBottom: '24px' }}>調合成功！</h1>
            <img src={SuccessImg} alt="成功" style={{ width: '320px', maxWidth: '90%', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }} />
            <p style={{ fontSize: '1.3em', marginTop: '24px', color: '#333' }}>素晴らしいポーションが完成しました！<br/></p>
            <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
              <button
                style={{
                  fontSize: '1.2em',
                  padding: '12px 36px',
                  background: '#8B4513',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
                onClick={() => navigate('/potion-create-2')}
              >
                次のポーションに進む
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 style={{ color: '#B22222', fontSize: '2.5em', marginBottom: '24px' }}>調合失敗…</h1>
            <img src={FatalerrorImg} alt="失敗" style={{ width: '320px', maxWidth: '90%', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }} />
            <p style={{ fontSize: '1.1em', marginTop: '18px', color: '#B22222', fontWeight: 'bold' }}>※水・薬草・謎の黄色い液体がすべて必要です</p>
            <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
              <button
                style={{
                  fontSize: '1.2em',
                  padding: '12px 36px',
                  background: '#8B4513',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
                onClick={() => navigate('/potion-create')}
              >
                最初に戻る
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};