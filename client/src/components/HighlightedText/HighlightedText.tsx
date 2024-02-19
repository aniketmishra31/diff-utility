
import "./HighlightedText.css";
interface HighlightedTextProps {
    original: string;
    lcs: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ original, lcs }) => {

    let renderElements: JSX.Element[] = [];
    const renderText = (char: string, isMatch: boolean) => {
        if (isMatch) {
            return (
                <span className="highlighted-text-matched">
                    {char}
                </span>
            );
        }
        else {
            return (
                <span className="highlighted-text-not-matched">
                    {char}
                </span>
            );
        }
    };
    const renderHighlightedText = () => {
        let i = 0;
        let j = 0;
        while (i < original.length && j < lcs.length) {
            if (original[i] === lcs[j]) {
                renderElements.push(renderText(original[i], true));
                i++;
                j++;
            }
            else {
                renderElements.push(renderText(original[i], false));
                i++;
            }
        }
        while (i < original.length) {
            renderElements.push(renderText(original[i], false));
            i++;
        }
        return renderElements;
    }

    return (
        <>
            <div className="text-display">
                {
                    renderHighlightedText().map((element) => {
                        return element;
                    })
                }
            </div>
        </>
    );
}

export default HighlightedText;