import { verifyToken } from 'shared';
import { AuthorizerService } from './authorizer-service';
import { AuthorizerRepository } from './authorizer-repository';
import { User } from 'user/model';

jest.mock('shared', () => ({
    verifyToken: jest.fn()
}));

jest.mock('./authorizer-repository');

describe('AuthorizerService', () => {
    let authorizerService: AuthorizerService;
    let mockRepository: jest.Mocked<AuthorizerRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockRepository = new AuthorizerRepository() as jest.Mocked<AuthorizerRepository>;
        authorizerService = new AuthorizerService();
        (authorizerService as any).repository = mockRepository;
    });

    describe('validateToken', () => {
        it('should return true when user exists', async () => {
            const mockUser = { email: 'test@example.com' } as User;
            const mockToken = 'valid-token';
            
            (verifyToken as jest.Mock).mockResolvedValue({ email: mockUser.email });
            mockRepository.getUserByEmail.mockResolvedValue(mockUser);

            const result = await authorizerService.validateToken(mockToken);

            expect(result).toBe(true);
            expect(verifyToken).toHaveBeenCalledWith(mockToken);
            expect(mockRepository.getUserByEmail).toHaveBeenCalledWith(mockUser.email);
        });

        it('should return false when user does not exist', async () => {
            const mockToken = 'valid-token';
            const nonExistentEmail = 'nonexistent@example.com';
            
            (verifyToken as jest.Mock).mockResolvedValue({ email: nonExistentEmail });
            mockRepository.getUserByEmail.mockResolvedValue(null);

            const result = await authorizerService.validateToken(mockToken);

            expect(result).toBe(false);
            expect(verifyToken).toHaveBeenCalledWith(mockToken);
            expect(mockRepository.getUserByEmail).toHaveBeenCalledWith(nonExistentEmail);
        });

        it('should throw error when token verification fails', async () => {
            const mockToken = 'invalid-token';
            const mockError = new Error('Invalid token');
            
            (verifyToken as jest.Mock).mockRejectedValue(mockError);

            await expect(authorizerService.validateToken(mockToken)).rejects.toThrow(mockError);
            expect(verifyToken).toHaveBeenCalledWith(mockToken);
            expect(mockRepository.getUserByEmail).not.toHaveBeenCalled();
        });
    });
}); 