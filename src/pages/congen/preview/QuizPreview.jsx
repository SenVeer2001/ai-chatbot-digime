// components/preview/QuizPreview.jsx
import { useState } from 'react';
import { ArrowLeft, ArrowRight, HelpCircle, Clock, Award, CheckCircle, XCircle } from 'lucide-react';

const QuizPreview = ({ lesson }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const quizData = {
        title: lesson?.title || 'Module Quiz',
        description: lesson?.description || 'Test your understanding of the concepts covered in this module.',
        timeLimit: lesson?.timeLimit || 10,
        passingScore: lesson?.passingScore || 70,
        questions: lesson?.questions || [
            {
                id: 1,
                question: 'What is Artificial Intelligence (AI)?',
                options: [
                    'The ability of machines to perform tasks that normally require human intelligence',
                    'A type of computer hardware',
                    'A programming language',
                    'A website design tool'
                ],
                correctAnswer: 0,
                explanation: 'AI refers to the simulation of human intelligence in machines.'
            },
            {
                id: 2,
                question: 'Which of the following is a type of Machine Learning?',
                options: [
                    'Supervised Learning',
                    'Manual Learning',
                    'Static Learning',
                    'Fixed Learning'
                ],
                correctAnswer: 0,
                explanation: 'Supervised Learning is one of the main types of ML.'
            },
            {
                id: 3,
                question: 'What does NLP stand for in AI?',
                options: [
                    'New Learning Process',
                    'Natural Language Processing',
                    'Neural Logic Programming',
                    'Network Layer Protocol'
                ],
                correctAnswer: 1,
                explanation: 'NLP stands for Natural Language Processing.'
            }
        ]
    };

    const handleSelectAnswer = (questionIndex, optionIndex) => {
        if (!showResults) {
            setSelectedAnswers({
                ...selectedAnswers,
                [questionIndex]: optionIndex
            });
        }
    };

    const handleNext = () => {
        if (currentQuestion < quizData.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = () => {
        setShowResults(true);
    };

    const calculateScore = () => {
        let correct = 0;
        quizData.questions.forEach((q, idx) => {
            if (selectedAnswers[idx] === q.correctAnswer) {
                correct++;
            }
        });
        return Math.round((correct / quizData.questions.length) * 100);
    };

    const question = quizData.questions[currentQuestion];
    const isAnswered = selectedAnswers[currentQuestion] !== undefined;

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            {/* Quiz Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-red-50 to-orange-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <HelpCircle size={20} className="text-red-500" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">{quizData.title}</h2>
                            <p className="text-xs text-gray-500">{quizData.description}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1 text-gray-600 bg-white px-3 py-1.5 rounded-full shadow-sm">
                            <Clock size={12} /> {quizData.timeLimit} min
                        </span>
                        <span className="flex items-center gap-1 text-gray-600 bg-white px-3 py-1.5 rounded-full shadow-sm">
                            <Award size={12} /> Pass: {quizData.passingScore}%
                        </span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Question {currentQuestion + 1} of {quizData.questions.length}</span>
                        <span>{Math.round(((currentQuestion + 1) / quizData.questions.length) * 100)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-red-500 rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Results View */}
            {showResults ? (
                <div className="p-8 text-center">
                    <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
                        calculateScore() >= quizData.passingScore ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                        {calculateScore() >= quizData.passingScore ? (
                            <CheckCircle size={48} className="text-green-500" />
                        ) : (
                            <XCircle size={48} className="text-red-500" />
                        )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {calculateScore() >= quizData.passingScore ? 'Congratulations!' : 'Keep Trying!'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                        You scored <span className="font-bold text-2xl">{calculateScore()}%</span>
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        {calculateScore() >= quizData.passingScore 
                            ? 'You have passed the quiz successfully.' 
                            : `You need ${quizData.passingScore}% to pass. Try again!`}
                    </p>
                    
                    {/* Review Answers */}
                    <div className="text-left space-y-3 mt-6 border-t border-gray-100 pt-6">
                        <h4 className="font-bold text-gray-700 mb-4">Review Answers:</h4>
                        {quizData.questions.map((q, idx) => (
                            <div key={q.id} className={`p-4 rounded-lg border ${
                                selectedAnswers[idx] === q.correctAnswer 
                                    ? 'bg-green-50 border-green-200' 
                                    : 'bg-red-50 border-red-200'
                            }`}>
                                <p className="text-sm font-medium text-gray-700 mb-2">
                                    Q{idx + 1}: {q.question}
                                </p>
                                <p className="text-xs text-gray-600">
                                    Your answer: <span className="font-medium">{q.options[selectedAnswers[idx]] || 'Not answered'}</span>
                                </p>
                                {selectedAnswers[idx] !== q.correctAnswer && (
                                    <p className="text-xs text-green-600 mt-1">
                                        Correct: <span className="font-medium">{q.options[q.correctAnswer]}</span>
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={() => {
                            setShowResults(false);
                            setSelectedAnswers({});
                            setCurrentQuestion(0);
                        }}
                        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                    >
                        Retake Quiz
                    </button>
                </div>
            ) : (
                /* Question View */
                <div className="p-8">
                    <h1 className="text-xl font-bold text-gray-800 mb-8">{question.question}</h1>
                    
                    <div className="space-y-4">
                        {question.options.map((option, idx) => (
                            <label 
                                key={idx} 
                                className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                    selectedAnswers[currentQuestion] === idx 
                                        ? 'border-blue-500 bg-blue-50' 
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                                onClick={() => handleSelectAnswer(currentQuestion, idx)}
                            >
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    selectedAnswers[currentQuestion] === idx 
                                        ? 'border-blue-500 bg-blue-500' 
                                        : 'border-gray-300'
                                }`}>
                                    {selectedAnswers[currentQuestion] === idx && (
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    )}
                                </div>
                                <span className="text-gray-700">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Navigation */}
            {!showResults && (
                <div className="flex justify-between p-6 border-t border-gray-100 bg-gray-50">
                    <button 
                        onClick={handlePrev}
                        disabled={currentQuestion === 0}
                        className={`flex items-center gap-2 px-6 py-2 rounded-md font-bold text-sm ${
                            currentQuestion === 0 
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                    >
                        <ArrowLeft size={16} /> Prev
                    </button>

                    {currentQuestion === quizData.questions.length - 1 ? (
                        <button 
                            onClick={handleSubmit}
                            disabled={Object.keys(selectedAnswers).length < quizData.questions.length}
                            className={`flex items-center gap-2 px-8 py-2 rounded-md font-bold text-sm shadow-lg ${
                                Object.keys(selectedAnswers).length < quizData.questions.length
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-green-600 text-white hover:bg-green-700 shadow-green-200'
                            }`}
                        >
                            Submit Quiz
                        </button>
                    ) : (
                        <button 
                            onClick={handleNext}
                            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-2 rounded-md font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700"
                        >
                            Next <ArrowRight size={16} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuizPreview;