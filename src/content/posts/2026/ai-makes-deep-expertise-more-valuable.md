---
title: 'AI Makes Deep Expertise More Valuable'
author: Ben Shi
type: post
date: 2026-08-04
slug: ai-makes-deep-expertise-more-valuable
description:
  'LLMs can produce plausible answers quickly. The harder part is knowing which problem matters and
  whether the answer fits the system you actually have.'
tags:
  - ai
  - coding
  - system-design
---

An LLM can write a rate limiter in seconds. That is not the same as deciding how rate limiting
should work.

Should the limit apply per user, account, token, or IP address? Is a short burst acceptable? What
happens when Redis is unavailable? Which endpoints need different limits, and what will customer
support need to see when legitimate traffic gets blocked?

The model can give sensible answers to all of these questions. It can also give answers that sound
sensible but are wrong for the system. Unless those decisions already exist in the codebase or in
someone's head, the model is filling in the gaps with guesses.

Someone still has to judge those guesses. That is the bottleneck.

When I know a codebase well, working with an LLM feels precise. I can describe a change in the
abstractions the system already uses. I know when it has quietly introduced a second convention, or
when a function it wrote is more complicated than the one already doing the job. A correction like
"_we already solve this elsewhere_" lands because I know where the work should end up and what
belongs there.

The model looks just as competent when I move into a domain I do not understand. That is the
dangerous bit. It still produces tidy code, confident explanations, and tests that appear thorough.
My review gets vague, because I can no longer tell an unfamiliar-but-correct approach from one that
is simply wrong.

Asking for another explanation does not solve this. It gives me another version of the model's
reasoning, but it does not give me the knowledge needed to verify it. I can keep prompting until I
get an answer I like without getting any closer to an answer that is true.

Code slop often starts here. The code compiles, the tests pass, and nobody involved can explain why
the solution belongs in this particular system.

The model is still the bottleneck sometimes. It forgets context I gave it a few turns ago, invents
an API that does not exist, or follows the wrong branch of an argument and keeps going. But once its
output is plausible enough to pass a casual review, generating more of it is easy. Deciding whether
any of it should ship still takes someone who understands the system.

With that knowledge, the questions I ask change. "_Add rate limiting_" becomes a conversation about
who might be abusing the endpoint, what breaks if the limiter fails, and what support needs to see.
The implementation can still come from the model, but those constraints come from understanding the
problem.

I am not convinced that better models will make expertise less important. Stronger models handle
more of the mechanical work, which leaves more of the real decisions to whoever is steering them.
The faster the model types, the more the work shifts to deciding what should actually be built.

The model can generate ten solutions before I properly understand one. If I cannot tell which of
them are any good, faster output just gives me a larger pile to sort through.
