const quoteList = [
  {
    quote: "The most effective way to do it, is to do it.",
    credit: "Amelia Earhart",
  },
  {
    quote:
      "I am not a product of my circumstances. I am a product of my decisions.",
    credit: "Stephen Covey",
  },
  {
    quote: "You can have results or excuses. Not both.",
    credit: "Arnold Schwarzenegger",
  },
  {
    quote: "You always have two choices: your commitment versus your fear.",
    credit: "Sammy Davis Jr",
  },
  {
    quote:
      "I'm a success today because I had a friend who believed in me and I didn't have the heart to let him down.",
    credit: "Abraham Lincoln",
  },
  {
    quote:
      "We are what we repeatedly do. Excellence, therefore, is not an act. But a habit.",
    credit: "Aristotle",
  },
  {
    quote: "The journey of a thousand miles begins with one step.",
    credit: "Lao Tzu",
  },
  { quote: "Think of many things, do one.", credit: "Portuguese proverb" },
  {
    quote:
      "If you think you're too small to have an impact, try going to bed with a mosquito.",
    credit: "Anita Roddick",
  },
  {
    quote: "If you have time to whine, then you have time to find a solution.",
    credit: "Dee Dee Artner",
  },
  {
    quote: "Quality means doing it right when no one is looking.",
    credit: "Henry Ford",
  },
  {
    quote:
      "It's our choices…that show what we truly are, far more than our abilities.",
    credit: "J. K. Rowling",
  },
  {
    quote:
      "The only day to discover the limits of the possible is to go beyond them into the impossible",
    credit: "Arthur C. Clarke",
  },
  {
    quote:
      "Success isn't always about greatness. It's about consistency. Consistent hard work leads to success. Greatness will come.",
    credit: "Dwayne Johnson",
  },
  {
    quote: "Luck is preparation meeting opportunity.",
    credit: "Oprah Winfrey",
  },
  { quote: "Everything you can imagine is real.", credit: "Pablo Picasso" },
  {
    quote: "You only get one chance at life and you have to grab it boldly.",
    credit: "Bear Grylls",
  },
  {
    quote: "Remember, no one can make you feel inferior without your consent.",
    credit: "Eleanor Roosevelt",
  },
  {
    quote:
      "I can't understand why people are frightened of new ideas. I'm frightened of the old ones.",
    credit: "John Cage",
  },
  {
    quote:
      "Our greatest glory is not in never falling, but in rising every time we fall.",
    credit: "Confucius",
  },
  { quote: "Live, love, laugh, leave a legacy.", credit: "Stephen Covey" },
  { quote: "Always deliver more than expected.", credit: "Larry Page" },
  {
    quote:
      "When something is important enough, you do it even if the odds are not in your favor.",
    credit: "Elon Musk",
  },
  {
    quote: "Continuous improvement is better than delayed perfection.",
    credit: "Mark Twain",
  },
  {
    quote:
      "Give me six hours to chop down a tree and I will spend first four sharpening the axe.",
    credit: "Abraham Lincoln",
  },
  {
    quote:
      "Chains of habit are too light to be felt until they are too heavy to be broken.",
    credit: "Warren Buffett",
  },
  {
    quote:
      "You will never change your life until you change something you do daily. The secret of your success is found in your daily routine.",
    credit: "John C. Maxwell",
  },
  {
    quote:
      "How wonderful is that nobody need wait a single moment before starting to improve the world.",
    credit: "Anne Frank",
  },
  {
    quote:
      "Define success on your own terms, achieve it by your own rules, and build a life you're proud to live.",
    credit: "Anne Sweeney",
  },
  {
    quote: "You can do anything, but not everything. Prioritize better.",
    credit: "David Allen",
  },
  {
    quote:
      "Progress has little to do with speed, but much to do with direction.",
    credit: "Timber Hawkeye",
  },
  {
    quote: "Start where you are. Use what you have. Do what you can.",
    credit: "Arthur Ashe",
  },
  {
    quote:
      "You have the power on your mind, not outside events. Realize this, and you will find strength.",
    credit: "Marcus Aurelius",
  },
  {
    quote:
      "Setting goals is the first step in turning the invisible into visible.",
    credit: "Tony Robbins",
  },
  {
    quote:
      "If a mind thinks with a believing attitude, one can do amazing things.",
    credit: "Norman Vincent Peale",
  },
  { quote: "Eighty percent of success is showing up.", credit: "Woody Allen" },
  {
    quote: "Your goal should be just out of reach. But not out of sight.",
    credit: "Remi Witt",
  },
  {
    quote:
      "If you are not where you want to be, do not quit. Instead reinvent yourself and change your habits.",
    credit: "Eric Thomas",
  },
  {
    quote:
      "You must want to be a butterfly so badly, you are willing to give up being a caterpillar.",
    credit: "Trina Paulus",
  },
  {
    quote:
      "Not knowing you can't do something is sometimes all it takes to do it.",
    credit: "Ally Carter",
  },
  {
    quote:
      "The most common way people give up their power is by thinking they don't have any.",
    credit: "Alice Walker",
  },
  {
    quote: "I think the thing to do is enjoy the ride while you're on it.",
    credit: "Johnny Depp",
  },
  {
    quote: "Be willing to be a beginner every single morning.",
    credit: "Meister Eckhart",
  },
  {
    quote:
      "Abandon anything about your life and habits that might be holding you back. Learn to create your own opportunities.",
    credit: "Sophia Amoruso",
  },
  {
    quote: "How you climb a mountain is more important than reaching the top.",
    credit: "Yvon Chouinard",
  },
  {
    quote:
      "Do the best you can until you know better. Then when you know better, do better.",
    credit: "Maya Angelou",
  },
  {
    quote: "What we fear doing most is usually what we most need to do.",
    credit: "Tim Ferriss",
  },
  { quote: "Do or do not. There is no try.", credit: "Yoda" },
  {
    quote:
      "There is virtue in work and there is virtue in rest. Use both and overlook neither.",
    credit: "Alan Cohen",
  },
  { quote: "Fall seven times, stand up eight.", credit: "Japanese proverb" },
  {
    quote:
      "Simplicity boils down to two steps: Identify the essential. Eliminate the rest.",
    credit: "Leo Babauta",
  },
  {
    quote:
      "Don't lament so much about how your career is going to turn out. You don't have a career. You have a life.",
    credit: "Cheryl Strayed",
  },
  {
    quote:
      "If your actions inspire others to dream more, learn more, do more and become more, you are a leader.",
    credit: "John Quincy Adams",
  },
  {
    quote:
      "A creative man is motivated by the desire to achieve, not by the desire to beat others.",
    credit: "Ayn Rand",
  },
  {
    quote:
      "To succeed in your mission, you must have single-minded devotion to your goal.",
    credit: "A. P. J. Abdul Kalam",
  },
  {
    quote:
      "Someone, at some point, came up with this very bad idea that an ordinary individual couldn't make a difference in the world. I think that's just a horrible thing.",
    credit: "John Skoll",
  },
  {
    quote:
      "Work harder on you than everyone else and you will become unusually successful.",
    credit: "Dani Johnson",
  },
  {
    quote:
      "Self-esteem comes from achieving something important when it's hard to do.",
    credit: "Clayton M. Christensen",
  },
  {
    quote: "There's no abiding success without commitment.",
    credit: "Tony Robbins",
  },
  {
    quote:
      "I am not a product of my circumstances. I am a product of my decisions.",
    credit: "Stephen Covey",
  },
  {
    quote: "The world is changed by your example, not by your opinion.",
    credit: "Paulo Coelho",
  },
  {
    quote: "Only those who attempt the absurd will achieve the impossible.",
    credit: "Miguel De Unamuno",
  },
  { quote: "Every moment is a fresh beginning.", credit: "T. S. Eliot" },
  {
    quote: "Don't justify your dreams, execute on them.",
    credit: "Gary Vaynerchuk",
  },
  {
    quote: "The secret of getting ahead is getting started.",
    credit: "Mark Twain",
  },
  {
    quote:
      "Challenges are what makes life interesting and overcoming them is what makes life meaningful.",
    credit: "Joshua J. Marine",
  },
  {
    quote:
      "Doing the best at this moment puts you in the best place for the next moment.",
    credit: "Oprah Winfrey",
  },
  {
    quote: "If something's important enough, you should try.",
    credit: "Elon Musk",
  },
  {
    quote:
      "Nothing is a mistake. There's no win and no fail. There's only make.",
    credit: "Corita Kent",
  },
  {
    quote:
      "Your time is limited, so don't waste it living someone else's life.",
    credit: "Steve Jobs",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    credit: "Steve Jobs",
  },
  {
    quote:
      "People often say that motivation doesn't last. Well, neither does bathing - that's why we recommend it daily.",
    credit: "Zig Ziglar",
  },
  {
    quote:
      "Mastery of life is not a question of control, but of finding a balance between human and being.",
    credit: "Eckhart Tolle",
  },
  {
    quote: "Don't count the days, make the days count.",
    credit: "Muhammad Ali",
  },
  {
    quote:
      "The question isn't who's going to let me; it's who is going to stop me?",
    credit: "Ayn Rand",
  },
  {
    quote: "Forget the past and live in the present hour.",
    credit: "Sarah Knowles Bolton",
  },
  {
    quote:
      "Ordinary people think merely of spending time, great people think of using it.",
    credit: "Arthur Schopenhauer",
  },
  {
    quote:
      "The more you eliminate the inefficient use of information, the better it is for productivity.",
    credit: "Mitch Kapor",
  },
  {
    quote:
      "The essence of self-discipline is to do the important thing rather than the urgent thing.",
    credit: "Barry Werner",
  },
  {
    quote:
      "There are no secrets to success. It is the result of preparation, hard work, and learning from failure.",
    credit: "Colin Powell",
  },
  {
    quote:
      "Never give up, for that is just the place and time that the tide will turn.",
    credit: "Harriet Beecher Stowe",
  },
  {
    quote:
      "I see the invisible. I believe the incredible. I attempt the impossible.",
    credit: "Robert Schuller",
  },
  {
    quote:
      "You cannot swim for new horizons until you have the courage to lose sight of the shore.",
    credit: "William Faulkner",
  },
  {
    quote:
      "If plan “A” doesn't work, the alphabet has 25 more letters - 204 if you're in Japan.",
    credit: "Claire Cook",
  },
  {
    quote:
      "The future belongs to those who learn more skills and combine them in creative ways.",
    credit: "Robert Greene",
  },
  {
    quote:
      "You must learn a new way to think before you can master a new way to be.",
    credit: "Marianne Williamson",
  },
  {
    quote: "Better a diamond with a flaw than a pebble without.",
    credit: "Confucius",
  },
  {
    quote:
      "Self-esteem comes from achieving something important when it's hard to do.",
    credit: "Clayton M. Christensen",
  },
  { quote: "Don't tell people your dreams. Show them.", credit: "Unknown" },
  {
    quote: "You miss 100 percent of the shots you never take.",
    credit: "Wayne Gretzky",
  },
  {
    quote:
      "Nothing is less productive than to make more efficient what should not be done at all.",
    credit: "Peter Drucker",
  },
  {
    quote: "I need not wait for I have the power to choose my own destiny.",
    credit: "Og Mandino",
  },
  { quote: "Be the change you wish to see in the world.", credit: "Gandhi" },
  {
    quote:
      "If you don't like the road you're walking, start paving another one.",
    credit: "Dolly Parton",
  },
  {
    quote:
      "Opportunities are usually disguised as hard work, so most people don't recognize them.",
    credit: "Ann Landers",
  },
  {
    quote: "If you dwell on the past or future, you will miss the moment.",
    credit: "Rumi",
  },
  {
    quote:
      "It is possible to commit no mistakes and still lose. That is not a weakness; that is life.",
    credit: "Jean-Luc Picard",
  },
  {
    quote:
      "Don't waste your time chasing butterflies. Mend your garden, and the butterflies will come.",
    credit: "Mario Quintana",
  },
  {
    quote:
      "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.",
    credit: "Michael Scott",
  },
  {
    quote: "If you're going through hell, keep going.",
    credit: "Winston Churchill",
  },
  {
    quote: "Courage is like a muscle - we strengthen it by use.",
    credit: "Ruth Gordon",
  },
  {
    quote:
      "To be successful you have to enjoy doing your best while at the same time contributing to something beyond yourself.",
    credit: "Mihaly Csikszentmihalyi",
  },
  {
    quote:
      "Build your own dreams, or someone else will hire you to build theirs.",
    credit: "Farrah Gray",
  },
  {
    quote:
      "The best way to improve your self-control is to see how and why you lose control.",
    credit: "Kelly McGonigal",
  },
  {
    quote:
      "Stop waiting. The time will never be perfect. Things will always pop up. The best time to start is always now.",
    credit: "Anonymous",
  },
  {
    quote: "Tough times never last, but tough people do.",
    credit: "Robert Schuller",
  },
  {
    quote: "We have a strategic plan. It's called doing things.",
    credit: "Herb Kelleher",
  },
  {
    quote:
      "Sometimes the fall kills you. And sometimes, when you fall, you fly.",
    credit: "Neil Gaiman",
  },
  {
    quote:
      "So many things are possible just as long as you don't know they're impossible.",
    credit: "Norton Juster",
  },
  {
    quote:
      "To live is the rarest thing in the world. Most people exist, that is all.",
    credit: "Oscar Wilde",
  },
  { quote: "The power of imagination makes us infinite.", credit: "John Muir" },
  {
    quote: "Self-trust is the first secret to success.",
    credit: "Ralph Waldo Emerson",
  },
  {
    quote: "Nothing becomes dynamic until it becomes specific.",
    credit: "Dani Johnson",
  },
  {
    quote:
      "The difference between ordinary and extraordinary is that little extra.",
    credit: "Jimmy Johnson",
  },
  { quote: "Every exit is an entry somewhere else.", credit: "Tom Stoppard" },
  {
    quote: "If you look for perfection, you will never be content.",
    credit: "Leo Tolstoy",
  },
  {
    quote: "Nothing is impossible; the word itself says 'I'm possible'!",
    credit: "Audrey Hepburn",
  },
  {
    quote:
      "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing or learning to do.",
    credit: "Pele",
  },
  {
    quote:
      "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",
    credit: "Rumi",
  },
  {
    quote: "Don't cry because it's over. Smile because it happened.",
    credit: "Dr. Seuss",
  },
  { quote: "Dream big and dare to fail.", credit: "Norman Vaughan" },
  {
    quote:
      "Either write something worth reading or do something worth writing.",
    credit: "Benjamin Franklin",
  },
  {
    quote:
      "You were born to win, but to be a winner you must plan to win, prepare to win, and expect to win.",
    credit: "Zig Ziglar",
  },
  {
    quote:
      "If you get up in the morning and think the future is going to be better, it is a bright day. Otherwise, it's not.",
    credit: "Elon Musk",
  },
  {
    quote: "It's always the hard part that creates value.",
    credit: "Seth Godin",
  },
  {
    quote:
      "I like the challenge of trying different things and wondering whether it's going to work or whether I'm going to fall flat on my face.",
    credit: "Johnny Depp",
  },
  { quote: "Success is my only option, failure's not.", credit: "Eminem" },
  {
    quote:
      "I think frugality drives innovation, just like other constraints do. One of the only ways to get out of a tight box is to invent your way out.",
    credit: "Jeff Bezos",
  },
  {
    quote:
      "Amateurs sit and wait for inspiration, the rest of us just get up and go to work.",
    credit: "Stephen King",
  },
  {
    quote:
      "If you want to live a happy life, tie it to a goal, not to people or things.",
    credit: "Albert Einstein",
  },
  {
    quote:
      "The more you praise and celebrate your life, the more there is in life to celebrate.",
    credit: "Oprah Winfrey",
  },
  {
    quote:
      "ACT. Actions kills procrastination and creates momentum to keep yourself motivated to keep moving ahead.",
    credit: "Dani Johnson",
  },
  { quote: "Becoming is better than being.", credit: "Carol Dweck" },
  {
    quote:
      "We think, mistakenly, that success is the result of the amount of time we put in at work, instead of the quality time we put in.",
    credit: "Arianna Huffington",
  },
  {
    quote:
      "When I hear somebody sigh, “Life is hard,” I am always tempted to ask, “Compared to what?”",
    credit: "Sydney Harris",
  },
  {
    quote: "The successful warrior is the average man, with laser-like focus.",
    credit: "Bruce Lee",
  },
  {
    quote: "It's not about ideas. It's about making ideas happen.",
    credit: "Scott Belsky",
  },
  {
    quote:
      "We must believe that we are gifted for something and that this thing must be attained.",
    credit: "Marie Curie",
  },
  {
    quote:
      "If you want to make a permanent change, stop focusing on the size of your problems and start focusing on the size of you!",
    credit: "T. Harv Eker",
  },
];

export default quoteList;
