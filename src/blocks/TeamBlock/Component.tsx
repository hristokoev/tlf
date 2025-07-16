import { Media } from '@/components/Media'
import type { TeamBlock as TeamBlockProps } from '@/payload-types'

export const TeamBlock: React.FC<TeamBlockProps> = (props) => {
  const { members } = props

  return (
    <section className="bg-white container py-24">
      <div className="grid grid-cols-4 gap-8">
        {members.map((member) => (
          <div key={member.id} className="flex flex-col justify-between gap-8">
            <Media resource={member.media} imgClassName="h-96 object-cover" />
            <h4 className="font-semibold text-xl">{member.name}</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 9 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="border p-2 size-8"
                >
                  <path
                    d="M4.23333 2.95455C4.38444 2.95455 4.51111 2.89792 4.61333 2.78466C4.71556 2.6714 4.76667 2.53106 4.76667 2.36364C4.76667 2.19621 4.71556 2.05587 4.61333 1.94261C4.51111 1.82936 4.38444 1.77273 4.23333 1.77273C4.08222 1.77273 3.95556 1.82936 3.85333 1.94261C3.75111 2.05587 3.7 2.19621 3.7 2.36364C3.7 2.53106 3.75111 2.6714 3.85333 2.78466C3.95556 2.89792 4.08222 2.95455 4.23333 2.95455ZM0.5 13V0H7.96667V3.01364H8.5V5.85H7.96667V13H0.5Z"
                    fill="#151515"
                  />
                </svg>
                <span>{member.phoneWork}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="border p-2 size-8"
                >
                  <path
                    d="M12.2417 13C10.737 13 9.24745 12.675 7.77292 12.025C6.29838 11.375 4.95926 10.4481 3.75556 9.24444C2.55185 8.04074 1.625 6.70463 0.975 5.23611C0.325 3.76759 0 2.275 0 0.758333V0H4.26111L4.92917 3.62917L2.87083 5.70556C3.13565 6.175 3.43056 6.62037 3.75556 7.04167C4.08056 7.46296 4.42963 7.85417 4.80278 8.21528C5.15185 8.56435 5.53403 8.89838 5.94931 9.21736C6.36458 9.53634 6.81296 9.83426 7.29444 10.1111L9.38889 8.01667L13 8.75694V13H12.2417Z"
                    fill="#151515"
                  />
                </svg>
                <span>{member.phoneMobile}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 17 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="border p-2 size-8"
                >
                  <path
                    d="M0.5 13V0H16.5V13H0.5ZM8.5 7.3125L14.9 3.25V1.625L8.5 5.6875L2.1 1.625V3.25L8.5 7.3125Z"
                    fill="#151515"
                  />
                </svg>
                <span>{member.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
