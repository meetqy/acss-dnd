import { Template, TemplateType } from "../types";

export const temp: Template = {
  type: TemplateType.component,
  jsx: (
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Notifications
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            Decide which communications you'd like to receive and how.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <fieldset>
                <legend class="text-base font-medium text-gray-900">
                  By Email
                </legend>
                <div class="mt-4 space-y-4">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="comments" class="font-medium text-gray-700">
                        Comments
                      </label>
                      <p class="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="candidates" class="font-medium text-gray-700">
                        Candidates
                      </label>
                      <p class="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="offers" class="font-medium text-gray-700">
                        Offers
                      </label>
                      <p class="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <div>
                  <legend class="text-base font-medium text-gray-900">
                    Push Notifications
                  </legend>
                  <p class="text-sm text-gray-500">
                    These are delivered via SMS to your mobile phone.
                  </p>
                </div>
                <div class="mt-4 space-y-4">
                  <div class="flex items-center">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      for="push-everything"
                      class="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Everything
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      for="push-email"
                      class="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Same as email
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      for="push-nothing"
                      class="ml-3 block text-sm font-medium text-gray-700"
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ),
};
