import React, { useState } from "react";
import { questions } from "../data/questions";

const TestForm = ({ onSubmit }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleChange = (index, answer) => {
    //answers 자체를 수정하는 것이 아니라, 새로운 배열을 복사해서 새로운 배열을 만들어준 다음에 그 새로운 배열을 가공해서 set을 해준다
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers);
  };
  console.log(answers);
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-gray-100 rounded shadow-md"
    >
      {questions.map((q, index) => (
        <div key={q.id} className="mb-4">
          <p className="font-semibold">{q.question}</p>
          {q.options.map((option, i) => (
            <label key={i} className="block">
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                checked={answers[index] === option} //raido 쓸 때 이렇게 처리해주면 중복체크가 안됨
                onChange={() => handleChange(index, option)}
                className="mr-2"
              />
              {option} {/* 예 or 아니요 */}
            </label>
          ))}
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        제출하기
      </button>
    </form>
  );
};

export default TestForm;
