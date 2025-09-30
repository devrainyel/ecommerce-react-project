import { Header } from '../components/Header';
import './NotFoundPage.css';

export function NotFoundPage() {
    return (
        <>
            <title>404 Page Not Found</title>
            <Header />
            <div className="not-found-container">
                <div className="not-found-number">404</div>
                <div className="not-found-message">Page Not Found</div>
            </div>
        </>
    );
}